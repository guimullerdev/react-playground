const ArrayMethods = () => {
    const numbers = [1, 2, 3, 4, 5];

    const doubled = numbers.map((number) => number * 2);

    return <div>{doubled.map((number) => <span key={number}>{number} </span>)}</div>;
};

export default ArrayMethods;