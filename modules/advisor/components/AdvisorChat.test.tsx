import { useRouter } from "next/navigation";

import { useChat } from "@ai-sdk/react";
import { render, screen } from "@testing-library/react";

import AdvisorChat from "./AdvisorChat";

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@ai-sdk/react", () => ({
  useChat: jest.fn(),
}));

jest.mock("ai", () => ({
  DefaultChatTransport: jest.fn(),
}));

const mockReplace = jest.fn();
const mockSendMessage = jest.fn();

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
  (useChat as jest.Mock).mockReturnValue({
    messages: [],
    sendMessage: mockSendMessage,
    status: "idle",
  });
});

describe("AdvisorChat", () => {
  it("zeigt leere Nachrichtenliste initial an", () => {
    render(<AdvisorChat />);
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });

  it("rendert das Eingabefeld und den Senden-Button", () => {
    render(<AdvisorChat />);
    expect(screen.getByPlaceholderText(/Frag mich/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /senden/i }),
    ).toBeInTheDocument();
  });

  it("ruft router.replace() auf wenn Tool-Result empfangen wird", () => {
    (useChat as jest.Mock).mockReturnValue({
      messages: [
        {
          id: "1",
          role: "assistant",
          parts: [
            {
              type: "tool-filterShoes",
              toolName: "filterShoes",
              state: "output-available",
              input: { categories: ["HIKING"], waterproof: true },
            },
          ],
        },
      ],
      sendMessage: mockSendMessage,
      status: "idle",
    });

    render(<AdvisorChat />);

    expect(mockReplace).toHaveBeenCalledWith(
      expect.stringContaining("categories=HIKING"),
    );
    expect(mockReplace).toHaveBeenCalledWith(
      expect.stringContaining("waterproof=true"),
    );
  });

  it('ruft router.replace() NICHT auf wenn Tool-State nicht "result" ist', () => {
    (useChat as jest.Mock).mockReturnValue({
      messages: [
        {
          id: "1",
          role: "assistant",
          parts: [
            {
              type: "tool-filterShoes",
              state: "input-available",
              input: { categories: ["SNEAKER"] },
            },
          ],
        },
      ],
      sendMessage: mockSendMessage,
      status: "idle",
    });

    render(<AdvisorChat />);
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
