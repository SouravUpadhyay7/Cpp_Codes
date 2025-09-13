#include <bits/stdc++.h>
using namespace std;

class Solution {
public:

    /* Function to check if the person
    in an adult or a teen */
    void isAdult(int age) {
        
       // If age is greater than 18
        if (age >= 18) {
            // The person is an adult
            cout << "Adult\n";
        } 
        
        // Otherwise
        else {
            // The person is a teen
            cout << "Teen\n";
        }
    }
};

int main() {
    // Creating an instance of Solution class
    Solution solution;

    //Take age as input
    int age;
    cout << "Enter your age: ";
    cin >> age;

    /* Function call to check if the person
    in an adult or a teen */
    solution.isAdult(age);
    return 0;
}