export const secondToStringDate = (seconds) => {
  if (seconds == 0) {
    return "Canlı";
  } else {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
  }
};

export const notifyMaker = (text, type) => {
  const title = { success: "Mesaj", error: "Hata", warning: "Uyarı" };
  return {
    title: title[type],
    text: text,
    type: type,
  };
};
