import {
  render,
  screen,
} from '@testing-library/react';

import AdvisorMessage from './AdvisorMessage';

describe("AdvisorMessage", () => {
  it("zeigt User-Nachricht an", () => {
    render(
      <AdvisorMessage
        role="user"
        content="Ich suche Wanderschuhe"
      />,
    );
    expect(screen.getByText("Ich suche Wanderschuhe")).toBeInTheDocument();
  });

  it("displays a wizard message", () => {
    render(
      <AdvisorMessage
        role="assistant"
        content="Gerne helfe ich dir!"
      />,
    );
    expect(screen.getByText("Gerne helfe ich dir!")).toBeInTheDocument();
  });

  it("displays a tool indicator when isToolCall=true", () => {
    render(
      <AdvisorMessage
        role="assistant"
        content=""
        isToolCall
      />,
    );
    expect(
      screen.getByText(/Filter werden angewendet/i),
    ).toBeInTheDocument();
  });

  it("displays a loading spinner when isLoading=true", () => {
    render(
      <AdvisorMessage
        role="assistant"
        content=""
        isLoading
      />,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
