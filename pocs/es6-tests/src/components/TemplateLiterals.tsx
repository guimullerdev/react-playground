const TemplateLiterals = ({ active }: { active: boolean }) => {
    return <div style={{ backgroundColor: active ? "green" : "red", width: "100px", height: "100px" }} />;
};
    
export default TemplateLiterals;