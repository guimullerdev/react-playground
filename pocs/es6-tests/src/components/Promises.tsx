const Promises = () => {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve('Resolved');
        }, 1000);
    });

    promise.then((value) => console.log(value));

    return <div>Promises</div>;
};

export default Promises;