interface ButtonProps {
  btnExtraClass: string;
  buttonType?: "button" | "submit" | "reset" | undefined;
  buttonTitle: string;
  btnClickHandler: () => void;
}

const CustomButton = ({
  btnExtraClass,
  buttonType,
  buttonTitle,
  btnClickHandler,
}: ButtonProps) => {
  return (
    <button
      className={`${btnExtraClass}`}
      type={buttonType}
      onClick={btnClickHandler}
    >
      {buttonTitle}
    </button>
  );
};

export default CustomButton;
