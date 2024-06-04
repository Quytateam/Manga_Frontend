export const formatDate = (timestamp) => {
  const now = new Date();
  const createdAt = new Date(timestamp);
  const diffTime = Math.abs(now - createdAt);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 1) {
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    if (diffMinutes < 60) {
      return diffMinutes === 0 ? "1 phut trước" : `${diffMinutes} phút trước`;
    } else {
      const diffHours = Math.floor(diffMinutes / 60);
      return `${diffHours} giờ trước`;
    }
  } else if (diffDays === 1) {
    return "1 ngày trước";
  } else if (diffDays < 30) {
    return `${diffDays} ngày trước`;
  } else {
    if (now.getFullYear() === createdAt.getFullYear()) {
      return `${createdAt.getHours().toString().padStart(2, "0")}:${createdAt
        .getMinutes()
        .toString()
        .padStart(2, "0")} ${createdAt
        .getDate()
        .toString()
        .padStart(2, "0")}/${(createdAt.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${createdAt.getDate().toString().padStart(2, "0")}/${(
        createdAt.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${createdAt.getFullYear().toString().substr(-2)}`;
    }
  }
};

export const formatDateFull = (timestamp) => {
  const date = new Date(timestamp);

  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

export const convertToSlug = (text) => {
  return text?.toLowerCase().replace(/\s+/g, "-");
};
