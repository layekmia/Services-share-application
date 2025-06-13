import { Spinner } from "flowbite-react";

export default function DeleteConfirmationModal({
  onConfirm,
  onCancel,
  heading,
  description,
  btnText,
  isLoading,
  loadingText
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-5">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full dark:bg-gray-800 dark:text-white">
        <h2 className="text-lg font-semibold mb-4">{heading}</h2>
        <p className="mb-6">{description}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:text-gray-800"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={onConfirm}
            className={`py-2 px-4 bg-red-500 text-white rounded-md ${
              isLoading ? "opacity-50" : ""
            }`}
          >
            {isLoading ? (
              <>
                <Spinner
                  size="sm"
                  aria-label="Info spinner example"
                  className="me-3"
                  light
                />
                {loadingText}
              </>
            ) : (
              <span>{btnText}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
