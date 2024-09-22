import { Dispatch, SetStateAction } from "react";
type Props = {
  listingUrl: string;
  handleScrape: () => void;
  setListingUrl: Dispatch<SetStateAction<string>>;
};

export function ScraperForm({
  listingUrl,
  setListingUrl,
  handleScrape,
}: Readonly<Props>) {
  return (
    <form>
      <div className="border-b border-white/10 pb-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className=" sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-white"
            >
              Job Listing URL
            </label>
            <div className="mt-2">
              <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                <input
                  value={listingUrl}
                  onChange={(e) => setListingUrl(e.currentTarget.value)}
                  id="listing_url"
                  name="listing_url"
                  type="text"
                  placeholder="indeed.com/listing"
                  className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-white"
          onClick={() => setListingUrl("")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={() => handleScrape()}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
