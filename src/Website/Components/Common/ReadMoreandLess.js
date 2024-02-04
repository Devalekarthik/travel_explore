import { useEffect, useState } from "react";

const ReadMoreandLess = (props) => {
  const { Data, text } = props;
  const [readMore, setReadMore] = useState(true);

  useEffect(() => {
    setReadMore(true);
  }, [props]);

  return (
    <>
      {text?.substring(0, readMore ? text.length / 5 : text.length)}
      <span className="showText" onClick={() => setReadMore(!readMore)}>
        ...{readMore ? Data.LabelData.readMore : Data.LabelData.readLess}
      </span>
    </>
  );
};

export default ReadMoreandLess;
