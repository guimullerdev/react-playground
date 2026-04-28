const ShortCircuit = ({ active }: { active: boolean }) => {
    return (
        <div>
            {active && <p>Active</p>}
            {active ? <p>Active</p> : <p>Inactive</p>}
            {active || <p>Inactive</p>}
        </div>
    );
};

export default ShortCircuit;