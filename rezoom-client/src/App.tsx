import { useState } from "react";
import { SingleFileUploader } from "./components/Uploader";
import { ScraperForm } from "./components/ScraperForm";
import "./App.css";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [key, setKey] = useState(Math.random());
  const [listingUrl, setListingUrl] = useState(
    "https://www.ziprecruiter.com/c/HARBOR-OBJECTS/Job/Software-Engineer/-in-Irvine,CA?jid=83f79333f701fc1d"
  );

  const baseURL = "http://127.0.0.1:5000/";
  async function handleFileUpload() {
    const url = `${baseURL}/api/file/upload`;
    const formData = new FormData();
    if (file instanceof Blob) {
      formData.append("file", file);
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const json = await response.json();
      console.log(json);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  async function handleScrape() {
    const url = `${baseURL}/api/listing/scrape`;
    const formData = new FormData();
    formData.append("job_listing", listingUrl);
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Scrape failed");
      }
      const json = await response.json();
      console.log(json);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold">
        Rezoom: Easily Tailor Your Resume to Any Job Listing
      </h1>
      <SingleFileUploader
        file={file}
        setFile={setFile}
        key={key}
        setKey={setKey}
        handleFileUpload={handleFileUpload}
      />
      <ScraperForm
        handleScrape={handleScrape}
        listingUrl={listingUrl}
        setListingUrl={setListingUrl}
      />
    </>
  );
}

export default App;
