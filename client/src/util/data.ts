export const formatTime = (time: string | undefined) => {
  if (time) {
    return time.replace("T", " ");
  }
};
