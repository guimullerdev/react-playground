import Destructuring from "./Destructuring";

const SpreadOperator = () => {
    const props = { name: 'Joe', age: 25 };

    return <Destructuring {...props} />
};

export default SpreadOperator;