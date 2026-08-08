
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("groq-sdk", () => {

  const create = vi.fn();

  return {
    default: class Groq {

      constructor() {

        this.chat = {
          completions: {
            create
          }
        };

      }

    }
  };

});

import Groq from "groq-sdk";
import askAI from "../services/aiService";

const groq = new Groq();

const mockCreate =
  groq.chat.completions.create;


describe("AI Service", () => {

  beforeEach(() => {

    vi.clearAllMocks();

    mockCreate.mockResolvedValue({

      choices: [
        {
          message: {
            content:
              "This answer came from the uploaded documents."
          }
        }
      ]

    });

  });


  it("handles empty documents", async () => {

    const result = await askAI(
      "",
      "What is operating system?"
    );

    expect(result).toBe(
      "⚠️ Please upload documents first."
    );

    expect(
      mockCreate
    ).not.toHaveBeenCalled();

  });


  it("does not call AI when information is not found", async () => {

    const documents = `
====================
FILE NAME:
Operating Systems.pdf

PAGES:
10

DOCUMENT CONTENT:
Operating systems manage computer resources, memory, processes and files. They provide services to users and applications. The operating system also manages hardware resources, controls running programs, handles storage, manages security, and coordinates communication between software and hardware components.
====================
`;

    const result = await askAI(
      documents,
      "quantum physics"
    );

    expect(result).toBe(
      "The information is not available in uploaded documents."
    );

    expect(
      mockCreate
    ).not.toHaveBeenCalled();

  });


  it("finds a relevant document", async () => {

    const documents = `
====================
FILE NAME:
Operating Systems.pdf

PAGES:
10

DOCUMENT CONTENT:
An operating system manages computer resources, memory, processes and files. The operating system provides important services to users and applications. It controls hardware resources and coordinates different programs running on a computer. Operating systems also manage storage, security, input and output devices, system processes and communication between software components. They provide an interface between users, applications and computer hardware.
====================

====================
FILE NAME:
Database Systems.pdf

PAGES:
12

DOCUMENT CONTENT:
A database system stores and organizes data. Database systems allow users to manage information efficiently. They provide mechanisms for creating, reading, updating and deleting data. Database systems can organize large amounts of information and allow users to retrieve records when needed. They also provide methods for maintaining data consistency, security and reliable access for different users.
====================
`;

    const result = await askAI(
      documents,
      "operating system"
    );

    expect(result).toBe(
      "This answer came from the uploaded documents."
    );

    expect(
      mockCreate
    ).toHaveBeenCalledTimes(1);

    const request =
      mockCreate.mock.calls[0][0];

    const prompt =
      request.messages[1].content;

    expect(prompt).toContain(
      "Operating Systems.pdf"
    );

  });


  it("can retrieve information from multiple PDFs", async () => {

    const documents = `
====================
FILE NAME:
Computer Networks.pdf

PAGES:
8

DOCUMENT CONTENT:
Computer networks allow devices to communicate and exchange data. Networks connect computers, servers, phones and other devices together. A network can allow users to share information and resources. Communication between devices depends on networking technologies and protocols. Computer networks are important for sharing data, accessing services, communicating between systems and connecting different computing devices. Networks can operate in homes, offices, universities and other environments.
====================

====================
FILE NAME:
Operating Systems.pdf

PAGES:
10

DOCUMENT CONTENT:
Operating systems manage processes, memory and computer resources. They control programs and provide services to applications and users. Operating systems also manage files, storage devices, hardware resources and system security. An operating system can work with computer networks to allow applications and users to communicate with other devices. It coordinates different software and hardware components and provides an environment in which programs can execute.
====================
`;

    const result = await askAI(
      documents,
      "computer networks operating systems"
    );

    expect(result).toBe(
      "This answer came from the uploaded documents."
    );

    expect(
      mockCreate
    ).toHaveBeenCalledTimes(1);

    const request =
      mockCreate.mock.calls[0][0];

    const prompt =
      request.messages[1].content;

    expect(prompt).toContain(
      "Computer Networks.pdf"
    );

    expect(prompt).toContain(
      "Operating Systems.pdf"
    );

  });


  it("returns the response generated by the AI", async () => {

    const documents = `
====================
FILE NAME:
Programming.pdf

PAGES:
5

DOCUMENT CONTENT:
Programming uses instructions, algorithms and code to solve problems. Programming languages allow developers to create software applications and systems. Developers use programming languages to write instructions that computers can execute. Programming involves problem solving, algorithms, data structures and logical thinking. Different programming languages provide different features and are used for different types of applications, including websites, mobile applications and desktop software.
====================
`;

    const result = await askAI(
      documents,
      "programming"
    );

    expect(result).toBe(
      "This answer came from the uploaded documents."
    );

    expect(
      mockCreate
    ).toHaveBeenCalledTimes(1);

  });

});

