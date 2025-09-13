#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Function to print the grades based on marks
    void studentGrade(int marks) {
        
        // If else ladder
        if (marks >= 90) {
            cout << "Grade A";
        } else if (marks >= 70) {
            cout << "Grade B";
        } else if (marks >= 50) {
            cout << "Grade C";
        } else if (marks >= 35) {
            cout << "Grade D";
        } else {
            cout << "Fail";
        }
    }
};

int main() {
    // Creating an instance of Solution class
    Solution solution;
    int marks;
    
    // Taking marks as input from user
    cout << "Enter your marks: ";
    cin >> marks;
    
    // Function call to print the grades based on marks
    solution.studentGrade(marks);
    return 0;
}