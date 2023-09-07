import Error from "../components/common/Error";

export type ErrorProps = {
  error?: unknown;
};

const ErrorIndication = ({ error }: ErrorProps): JSX.Element => {
  return (
    <>
      <Error error={error} />
    </>
  );
};
export default ErrorIndication;
