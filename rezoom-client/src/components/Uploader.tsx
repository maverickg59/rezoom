import { useState, Dispatch, SetStateAction } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { generateUniqueKey } from "../lib/helpers";

type Props = {
  file: File | null;
  handleFileUpload: () => void;
  setFile: Dispatch<SetStateAction<File | null>>;
};

export function SingleFileUploader({
  file,
  setFile,
  handleFileUpload,
}: Readonly<Props>) {
  const [key, setKey] = useState(Math.random());
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-white"
              >
                Upload Your Resume
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-500"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                    >
                      <span>Upload your resume</span>
                      <input
                        id="file-upload"
                        key={key}
                        name="file-upload"
                        type="file"
                        accept=".pdf,.docx"
                        className="sr-only"
                        onChange={(e) => {
                          if (!e.currentTarget.files) return;
                          setFile(e.currentTarget.files[0]);
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-400">
                    PDF or DOCX up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {file && (
        <div>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </div>
      )}

      {/* {file && ( */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-white"
          onClick={() => {
            setKey(generateUniqueKey(key));
            setFile(null);
          }}
        >
          Delete
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={(e) => {
            e.preventDefault();
            handleFileUpload();
          }}
        >
          Submit
        </button>
      </div>
      {/* )} */}
    </form>
  );
}
