
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UploadBox from "../components/UploadBox";

// Mock PDF reader so pdfjs-dist is not loaded during testing
vi.mock("../utils/pdfReader", () => ({
  default: vi.fn()
}));

describe("UploadBox", () => {

  it("renders the upload section", () => {

    render(
      <UploadBox
        addDocument={vi.fn()}
        documents={[]}
        removeDocument={vi.fn()}
        clearDocuments={vi.fn()}
      />
    );

    expect(
      screen.getByText("📚 Upload Knowledge Documents")
    ).toBeInTheDocument();

  });


  it("displays an uploaded document", () => {

    const documents = [
      {
        name: "test.pdf",
        pages: 5,
        size: "120 KB",
        text: "This is test document content."
      }
    ];

    render(
      <UploadBox
        addDocument={vi.fn()}
        documents={documents}
        removeDocument={vi.fn()}
        clearDocuments={vi.fn()}
      />
    );

    expect(
      screen.getByText(/test\.pdf/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Ready for AI/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/120 KB/)
    ).toBeInTheDocument();

  });

});

