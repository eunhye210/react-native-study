// retry
// staleTime : 5 * 60 * 1000, // 5분
// cacheTime : 10 * 60 * 1000, // 5분

import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 20 * 1000, // fresh -> stale 로 변경되는데 걸리는 시간, 20초 내에는 재호출 안함
      cacheTime: 5 * 60 * 1000, // 5분
    },
    mutation: {
      retry: false,
    },
  },
});

export default queryClient;
