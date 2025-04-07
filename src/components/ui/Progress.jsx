export const Progress = ({ value }) => (
    <div style={{ width: "100%", backgroundColor: "#eee", borderRadius: "5px" }}>
      <div style={{ width: `${value}%`, height: "10px", backgroundColor: "blue" }} />
    </div>
  );
  