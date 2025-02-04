import { Upload } from 'lucide-react';
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { Button } from './ui/button';

export default forwardRef(function AvatarInput(
    {
        className = '',
        isFocused = false,
        defaultValue,
        error,
        ...props
    }: React.InputHTMLAttributes<HTMLInputElement> & {
        isFocused?: boolean;
        error?: string;
    },
    ref,
) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [defaultPreview, setDefaultPreview] = useState<string | null>(
        defaultValue ? `/storage/${defaultValue}` : null,
    );

    // Update preview saat defaultValue berubah
    useEffect(() => {
        setDefaultPreview(defaultValue ? `/storage/${defaultValue}` : null);
    }, [defaultValue]);

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
    }));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null); // Reset preview jika file dihapus
        }

        props.onChange?.(event);
    };

    return (
        <div className="flex flex-col items-center space-y-3">
            <div className="relative">
                {(preview || defaultPreview) && (
                    <img
                        src={preview || defaultPreview || ''}
                        alt="Avatar Preview"
                        className="h-24 w-24 rounded-full border border-gray-300 object-cover"
                    />
                )}

                {!preview && !defaultPreview && (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gray-300 bg-none">
                        <span className="text-sm text-gray-500">No Image</span>
                    </div>
                )}

                {error && (
                    <div className="absolute -bottom-5 text-center text-sm text-red-600">
                        {error}
                    </div>
                )}
            </div>

            <input
                {...props}
                type="file"
                accept="image/*"
                className={'hidden ' + className}
                ref={inputRef}
                onChange={handleChange}
            />

            <div className="flex gap-2">
                <Button
                    variant="secondary"
                    onClick={() => inputRef.current?.click()}
                    type="button"
                >
                    <Upload /> {preview ? 'Change' : 'Upload'} Avatar
                </Button>
            </div>
        </div>
    );
});
