import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

export default forwardRef(function AvatarInput(
    {
        className = '',
        isFocused = false,
        ...props
    }: React.InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
    ref,
) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
    }));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }

        // re-render on change
        if (props.onChange) {
            props.onChange(event);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-2">
            {preview ? (
                <img
                    src={preview}
                    alt="Avatar Preview"
                    className="h-24 w-24 rounded-full border border-gray-300 object-cover"
                />
            ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gray-300 bg-gray-200">
                    <span className="text-sm text-gray-500">No Image</span>
                </div>
            )}

            <input
                {...props}
                type="file"
                accept="image/*"
                className={'hidden ' + className}
                ref={inputRef}
                onChange={handleChange}
            />

            <button
                type="button"
                className="rounded-md bg-indigo-600 px-4 py-1 text-sm text-white shadow hover:bg-indigo-700"
                onClick={() => inputRef.current?.click()}
            >
                Upload Avatar
            </button>
        </div>
    );
});
