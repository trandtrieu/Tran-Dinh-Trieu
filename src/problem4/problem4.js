function sum_to_n_a(n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}
function sum_to_n_b(n) {
    if (n === 1)
        return 1;
    return n + sum_to_n_b(n - 1);
}
function sum_to_n_c(n) {
    return n * (n + 1) / 2;
}
console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
