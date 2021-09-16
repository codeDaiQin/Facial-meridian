var lengthOfLongestSubstring = function (s) {
  let str = ''
  let max = 0
  for (let i = 0; i < s.length;) {
    if (str.indexOf(s[i]) < 0) {
      str += s[i]
      i++
    } else {
      str = str.substr(1)
    }
    str.length > max && (max = str.length)
  }
  return max
};
// console.log(lengthOfLongestSubstring('nnnnnnnnn'));







var findMedianSortedArrays = function (nums1, nums2) {
  nums1 = nums1.concat(nums2).sort((a, b) => a - b)
  return nums1.length % 2 ? nums1[Math.floor(nums1.length / 2)] : (nums1[(nums1.length / 2) - 1] + nums1[(nums1.length / 2)]) / 2
};

// console.log(findMedianSortedArrays([3], [-2, -1]));


var findNumberIn2DArray = function (matrix, target) {
  for (i of matrix) {
    for (j of i) {
      if (j == target) {
        return true
      }
    }
  }
  return false
};

console.log(findNumberIn2DArray([[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]]
  , 5));