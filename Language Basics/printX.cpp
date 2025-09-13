#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Function to print the value X on the screen N times
    void printX(int X, int N) {
        // Check if N is non-negative
        if (N < 0) {
            cout << "Invalid number of times" << endl;
            return;
        }

        // Loop to print the value X, N times
        for (int i = 0; i < N; ++i) {
            // Print the value X
            cout << X;
            
            /* Print a space between numbers,
            but not after the last one */
            if (i < N - 1) {
                cout << " ";
            }
        }
        
        // Move to the next line after printing
        cout << endl;
    }
};

int main() {
    // Creating an instance of Solution class 
    Solution sol;
    int X = 7, N = 5;
    
    // Function call to print the value X, N times
    sol.printX(X, N);
    return 0;
}