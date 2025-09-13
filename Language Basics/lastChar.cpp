#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Function to return the last character of the string
    char lastChar(string &s) {
        
        // Return last character of string
        return s[s.size() - 1];
    }
};

int main() {
    // Creating an instance of Solution class
    Solution sol;
    string s = "example";
    
    // Function call to get the last character of the string
    char ans = sol.lastChar(s);
    cout << "The last character is: " << ans; 
    return 0;
}