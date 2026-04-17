import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import AdvisorSidebar from './AdvisorSidebar';

// Mock the AdvisorChat component to simplify testing the sidebar behavior
jest.mock("./AdvisorChat", () => ({
  __esModule: true,
  default: () => <div data-testid="advisor-chat">Chat</div>,
}));

describe("AdvisorSidebar", () => {
  it("displays the toggle button", () => {
    render(<AdvisorSidebar />);
    expect(
      screen.getByRole("button", { name: /Chat öffnen/i }),
    ).toBeInTheDocument();
  });

  it("does not display the chat initially", () => {
    render(<AdvisorSidebar />);
    expect(screen.queryByTestId("advisor-chat")).not.toBeInTheDocument();
  });

  it("opens the chat when the toggle button is clicked", () => {
    render(<AdvisorSidebar />);
    fireEvent.click(screen.getByRole("button", { name: /Chat öffnen/i }));
    expect(screen.getByTestId("advisor-chat")).toBeInTheDocument();
  });

  it("closes the chat when the toggle button is clicked again", () => {
    render(<AdvisorSidebar />);

    fireEvent.click(screen.getByRole("button", { name: /Chat öffnen/i })); // first open
    fireEvent.click(
      screen.getByRole("button", { name: /Chat schließen/i }),
    ); // then close
    expect(screen.queryByTestId("advisor-chat")).not.toBeInTheDocument();
  });
});
