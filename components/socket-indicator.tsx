"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge
        variant="outline"
        className="rounded-full sm:rounded-sm bg-red-800 text-white border-none"
      >
        <p className="hidden sm:block">Fallback: Polling every 1s</p>
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="rounded-full sm:rounded-sm bg-green-400 text-white border-none "
    >
      <p className="hidden sm:block">Live: Real-time updates</p>
    </Badge>
  );
};
