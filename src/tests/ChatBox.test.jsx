
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor
} from "@testing-library/react";

import ChatBox from "../components/ChatBox";


// Mock the AI service
vi.mock("../services/aiService", () => ({
  default: vi.fn()
}));

import askAI from "../services/aiService";


describe("ChatBox", () => {

  beforeEach(() => {

    vi.clearAllMocks();

    localStorage.clear();

    askAI.mockResolvedValue(
      "This answer came from the uploaded documents."
    );

  });


  // TEST 1
  it("renders the question input", () => {

    render(
      <ChatBox documentText="Some document content" />
    );

    expect(
      screen.getByPlaceholderText(
        "Ask something about documents..."
      )
    ).toBeInTheDocument();

  });


  // TEST 2
  it("renders the Ask AI button", () => {

    render(
      <ChatBox documentText="Some document content" />
    );

    expect(
      screen.getByRole("button", {
        name: "Ask AI"
      })
    ).toBeInTheDocument();

  });


  // TEST 3
  it("allows the user to type a question", () => {

    render(
      <ChatBox documentText="Some document content" />
    );

    const input =
      screen.getByPlaceholderText(
        "Ask something about documents..."
      );

    fireEvent.change(
      input,
      {
        target: {
          value: "What is operating system?"
        }
      }
    );

    expect(input.value).toBe(
      "What is operating system?"
    );

  });


  // TEST 4
  it("does not call AI when the question is empty", async () => {

    render(
      <ChatBox documentText="Some document content" />
    );

    const button =
      screen.getByRole("button", {
        name: "Ask AI"
      });

    fireEvent.click(button);

    expect(askAI).not.toHaveBeenCalled();

  });


  // TEST 5
  it("shows a message when no documents are uploaded", async () => {

    render(
      <ChatBox documentText="" />
    );

    const input =
      screen.getByPlaceholderText(
        "Ask something about documents..."
      );

    fireEvent.change(
      input,
      {
        target: {
          value: "What is this document about?"
        }
      }
    );

    const button =
      screen.getByRole("button", {
        name: "Ask AI"
      });

    fireEvent.click(button);

    expect(
      await screen.findByText(
        "⚠️ Please upload documents first."
      )
    ).toBeInTheDocument();

    expect(
      askAI
    ).not.toHaveBeenCalled();

  });


  // TEST 6
  it("calls AI and displays the answer", async () => {

    render(
      <ChatBox documentText="Operating systems manage computer resources." />
    );

    const input =
      screen.getByPlaceholderText(
        "Ask something about documents..."
      );

    fireEvent.change(
      input,
      {
        target: {
          value: "What is an operating system?"
        }
      }
    );

    const button =
      screen.getByRole("button", {
        name: "Ask AI"
      });

    fireEvent.click(button);

    await waitFor(() => {

      expect(askAI).toHaveBeenCalledTimes(1);

    });

    expect(
      askAI
    ).toHaveBeenCalledWith(
      "Operating systems manage computer resources.",
      "What is an operating system?"
    );

    expect(
      await screen.findByText(
        "This answer came from the uploaded documents."
      )
    ).toBeInTheDocument();

  });


  // TEST 7
  it("saves the chat in localStorage", async () => {

    render(
      <ChatBox documentText="Programming is the process of writing instructions." />
    );

    const input =
      screen.getByPlaceholderText(
        "Ask something about documents..."
      );

    fireEvent.change(
      input,
      {
        target: {
          value: "What is programming?"
        }
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Ask AI"
      })
    );

    await waitFor(() => {

      expect(
        localStorage.getItem(
          "secondBrainChat"
        )
      ).not.toBeNull();

    });

    const saved =
      JSON.parse(
        localStorage.getItem(
          "secondBrainChat"
        )
      );

    expect(saved).toHaveLength(1);

    expect(
      saved[0].question
    ).toBe(
      "What is programming?"
    );

    expect(
      saved[0].answer
    ).toBe(
      "This answer came from the uploaded documents."
    );

  });


  // TEST 8
  it("opens chat history", () => {

    render(
      <ChatBox documentText="Some document content" />
    );

    const historyButton =
      screen.getByRole("button", {
        name: "🕘 See Chat History"
      });

    fireEvent.click(historyButton);

    expect(
      screen.getByText(
        "No previous chats"
      )
    ).toBeInTheDocument();

  });

});

