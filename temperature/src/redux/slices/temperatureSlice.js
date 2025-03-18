const { createSlice } = require("@reduxjs/toolkit");

const temperatureSlice = createSlice({
    name: "temperature",
    initialState: {
        celsius: 0,
        fahrenheit: 32, // Default value for consistency
    },
    reducers: {
        // Convert Celsius to Fahrenheit
        convertCelsius: (state, { payload }) => {
            state.celsius = payload;
            state.fahrenheit = parseFloat(((payload * 9) / 5 + 32).toFixed(2));
        },

        // Convert Fahrenheit to Celsius
        convertFahrenheit: (state, { payload }) => {
            state.celsius = parseFloat(((payload - 32) * 5 / 9).toFixed(2));
            state.fahrenheit = payload;
        }
    }
});

export const { convertCelsius, convertFahrenheit } = temperatureSlice.actions;
export default temperatureSlice.reducer;
