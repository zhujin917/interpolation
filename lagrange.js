function lagrangeInterpolation(points) {

    function gcd(a, b) { // 辗转相除法求最大公约数
        if (b == 0) {
            return a;
        }
        return gcd(b, a % b);
    };

    const individual = []; // 拉格朗日基函数
    const numeratorResult = new Array(points.length).fill(0); // 各拉格朗日基函数分子的和
    let denominatorResult; // 各拉格朗日基函数分母的最小公倍数

    for (const individualIndex in points) {
        const numerator = [1]; // 分子各次数的系数
        let denominator = 1; // 分母
        for (const divisorIndex in points) {
            if (individualIndex == divisorIndex) {
                continue;
            }
            const temp1 = [0].concat(numerator); // 乘上 x
            const temp2 = numerator.map(element => element * -points[divisorIndex][0]).concat([0]);
            for (const i in temp1) {
                numerator[i] = temp1[i] + temp2[i];
            }
            denominator *= (points[individualIndex][0] - points[divisorIndex][0]);
        }
        individual.push([numerator, denominator]);
        denominatorResult = (individualIndex == 0) ? denominator : denominatorResult / gcd(denominatorResult, denominator) * denominator;
    }

    for (const individualIndex in points) {
        for (const numeratorIndex in numeratorResult) {
            numeratorResult[numeratorIndex] += points[individualIndex][1] * individual[individualIndex][0][numeratorIndex] * (denominatorResult / individual[individualIndex][1]);
        }
    }

    return [numeratorResult, denominatorResult];

};

console.log(lagrangeInterpolation([
    [1, 1],
    [2, 3],
    [3, 5],
    [4, 7],
    [5, 114514],
]));
// 预期输出：[ [ 2748096, -5725202, 4007675, -1145050, 114505 ], 24 ]
