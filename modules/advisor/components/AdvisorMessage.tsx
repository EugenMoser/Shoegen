"use client";

interface AdvisorMessageProps {
  role: "user" | "assistant";
  content: string;
  isToolCall?: boolean;
  isLoading?: boolean;
}

export default function AdvisorMessage({
  role,
  content,
  isToolCall = false,
  isLoading = false,
}: AdvisorMessageProps): React.JSX.Element {
  const isUser = role === "user";

  // Display loading state if isLoading is true
  if (isLoading) {
    return (
      <div className="flex justify-start mb-2">
        <div
          role="status"
          className="bg-muted rounded-lg px-3 py-2 text-sm animate-pulse"
        >
          ...
        </div>
      </div>
    );
  }

  // Display tool call state if isToolCall is true
  if (isToolCall) {
    return (
      <div className="flex justify-start mb-2">
        <div className="bg-blue-50 text-blue-700 rounded-lg px-3 py-2 text-xs italic">
          Filter werden angewendet...
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex mb-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`rounded-lg px-3 py-2 text-sm max-w-[85%] ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
