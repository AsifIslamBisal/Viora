import { useId, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./FileUpload.css";

const formatBytes = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export function FileUpload({
  files = [],
  onChange,
  label,
  hint,
  error,
  accept,
  multiple = true,
  maxSize,
  disabled = false,
  className,
  ...rest
}) {
  const id = useId();
  const inputId = `${id}-input`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const inputRef = useRef(null);

  const [dragging, setDragging] = useState(false);
  const [oversized, setOversized] = useState("");

  const shownError = oversized || error;

  const ingest = (incoming) => {
    const belowLimit = maxSize
      ? incoming.filter((file) => file.size <= maxSize)
      : incoming;
    const overLimit = maxSize
      ? incoming.filter((file) => file.size > maxSize)
      : [];

    const next = multiple
      ? [...files, ...belowLimit].filter(
          (file, index, all) =>
            all.findIndex((other) => other.name === file.name) === index
        )
      : belowLimit.slice(-1);

    if (overLimit.length) {
      setOversized(
        `"${overLimit.map((file) => file.name).join('", "')}" exceeded the size limit.`
      );
    } else {
      setOversized("");
    }
    onChange?.(next);
  };

  return (
    <div className={cx("viora-field", "viora-file-upload", className)}>
      {label ? (
        <label className="viora-field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        aria-invalid={shownError ? true : undefined}
        aria-describedby={
          shownError ? errorId : hint ? hintId : undefined
        }
        className={cx(
          "viora-file-upload__dropzone",
          dragging && "viora-file-upload__dropzone--dragging",
          shownError && "viora-file-upload__dropzone--error",
          disabled && "viora-file-upload__dropzone--disabled"
        )}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(event) => {
          if (!disabled && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) {
            setDragging(true);
          }
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          if (!disabled) {
            ingest(Array.from(event.dataTransfer?.files ?? []));
          }
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 16V4m0 0l-4 4m4-4l4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="viora-file-upload__title">
          Drop files here or <strong>browse</strong>
        </span>
        {accept ? (
          <span className="viora-file-upload__accept">Accepted: {accept}</span>
        ) : null}
      </div>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="viora-file-upload__input"
        onChange={(event) => {
          const incoming = Array.from(event.target.files ?? []);
          if (incoming.length) {
            ingest(incoming);
          }
          event.target.value = "";
        }}
        {...rest}
      />

      {files.length ? (
        <ul className="viora-file-upload__list">
          {files.map((file) => (
            <li key={file.name} className="viora-file-upload__file">
              <span className="viora-file-upload__file-name">{file.name}</span>
              <span className="viora-file-upload__file-size">
                {formatBytes(file.size)}
              </span>
              <button
                type="button"
                aria-label={`Remove ${file.name}`}
                className="viora-file-upload__remove"
                disabled={disabled}
                onClick={() =>
                  onChange?.(files.filter((other) => other.name !== file.name))
                }
              >
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M5 5l6 6M11 5l-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {hint || shownError ? (
        <p
          id={error ? errorId : hintId}
          className={cx(
            "viora-field__message",
            shownError && "viora-field__message--error"
          )}
        >
          {shownError || hint}
        </p>
      ) : null}
    </div>
  );
}

export default FileUpload;