export function ErrorFetching({ messageError }) {
  return (
    <div className="errorFetching">
      <h3>
        {" "}
        {messageError} <span>🔴</span>
      </h3>
    </div>
  );
}
