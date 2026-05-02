import { snowProperties } from './src/app/data/snow-properties';

const testFilters = (status) => {
    let filtered = [...snowProperties];
    if (status !== "All Status") {
        filtered = filtered.filter((p) => p.status === status);
    }
    console.log(`Status: ${status}, Count: ${filtered.length}`);
};

testFilters("All Status");
testFilters("For Rent");
testFilters("For Sale");
