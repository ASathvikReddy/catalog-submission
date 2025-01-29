# Polynomial Reconstruction Using Lagrange Interpolation

## Overview
This project implements a simplified version of Shamir's Secret Sharing algorithm to reconstruct the constant term of an unknown polynomial using the Lagrange interpolation method. The polynomial is represented as `f(x) = a_m * x^m + a_{m-1} * x^{m-1} + ... + a_1 * x + c`, and the task is to find the constant term `c`.

## Process

1. **Input Parsing**:
   - The input is provided as a JSON file containing polynomial roots. The roots are encoded with varying bases.
   - The JSON file includes the following keys:
     - `n`: Total number of points (roots).
     - `k`: Minimum number of points required to solve for the polynomial's coefficients.
     - Each root is represented by a key (x-coordinate) and an object containing the `base` (numerical base of the value) and `value` (encoded polynomial value).

2. **Decoding Values**:
   - For each root, the x-coordinate is extracted from the key, and the encoded `value` is decoded from the specified `base` to a decimal (base 10) integer.

3. **Point Collection**:
   - The decoded values are paired with their respective x-coordinates, forming a set of points: `(x, y)`.

4. **Validation**:
   - The program ensures that there are at least `k` points available to perform polynomial reconstruction. If fewer than `k` points are provided, an error is thrown.

5. **Lagrange Interpolation**:
   - The Lagrange interpolation formula is applied to the points to calculate the constant term `c`. The formula computes a basis polynomial for each point and sums the contributions of each basis polynomial weighted by the corresponding y-value.

6. **Result**:
   - The interpolated value of the constant term `c` is rounded to the nearest integer and printed as the result. 

   **Example output:**
   ```
   The constant term c is: 3
   ```

7. **Error Handling**:
   - If there are any issues with reading the input file, decoding values, or performing interpolation, the program handles the errors gracefully and outputs an appropriate error message.

## Example Input (JSON Format)
```json
{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}
```

## Example Output
```
The constant term c is: 3
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
