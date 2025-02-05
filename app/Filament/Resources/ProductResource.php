<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Auth;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Hidden::make('user_id')
                    ->default(fn() => Auth::id())
                    ->required(),
                Select::make('category_id')
                    ->label('Category')
                    ->relationship('category', 'name')
                    ->required(),
                TextInput::make('name')
                    ->required()
                    ->autocomplete(false),
                RichEditor::make('description')
                    ->required(),
                FileUpload::make('image')
                    ->label('Thumbnail')
                    ->image()
                    ->directory('product-thumbnails')
                    ->required(),
                Repeater::make('variations') // Repeater for Product Variations
                    ->relationship('variations') // Link the relation to ProductVariation
                    ->schema([
                        TextInput::make('name')
                            ->label('Variation Name')
                            ->required(),
                        TextInput::make('price')
                            ->numeric()
                            ->required(),
                        TextInput::make('stock')
                            ->numeric()
                            ->required(),
                        FileUpload::make('image')
                            ->label('Variation Thumbnail')
                            ->directory('product-variations')
                            ->required(),
                    ])
                    ->columns(1)
                    ->label('Product Variations'),
                Repeater::make('images')
                    ->relationship('images')
                    ->schema([
                        FileUpload::make('url')
                            ->label('Image')
                            ->disk('public')
                            ->directory('product-thumbnails')
                            ->required()
                    ])
                    ->columns(1)
                    ->label('Product Images'),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('category.name')
                    ->label('Category')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('variations.price')
                    ->label('Price')
                    ->getStateUsing(function ($record) {
                        $variations = $record->variations;
                        if ($variations->isNotEmpty()) {
                            $minPrice = $variations->min('price');
                            $maxPrice = $variations->max('price');
                            return "IDR " . number_format($minPrice, 2) . " - " . number_format($maxPrice, 2);
                        }
                        return 'No Variations';
                    }),
                TextColumn::make('variations.stock')
                    ->label('Stock')
                    ->getStateUsing(function ($record) {
                        $variations = $record->variations;

                        if ($variations->isNotEmpty()) {
                            $totalStock = $variations->sum('stock');
                            return $totalStock;
                        }
                        return 'No Variations';
                    }),
                TextColumn::make('user.username')
                    ->label('Author')
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
