export const ToastMinimumStyle = {
  style: {
    width: "fit-content",
    paddingTop: 12,
    paddingBottom: 12,
  },
};

export const ToastSuccessStyle = {
  style: {
    ...ToastMinimumStyle.style,
    backgroundColor: "#6fcf97",
  },
};

export const ToastErrorStyle = {
  style: {
    ...ToastMinimumStyle.style,
    backgroundColor: "#eb5757",
  },
};
