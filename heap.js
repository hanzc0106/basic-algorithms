/**
 * @name 小顶堆实现
 * @author hanzc0106
 * @date 2024-06-07
 */

const DEV = false;

function log(...args) {
    console.log(...args);
}

class MinerHeap {
    static sort(nums) {
        const mh = new MinerHeap(nums);
        mh.buildHeap();

        log(nums);
        const res = [];
        while (!mh.isEmpty()) {
            DEV && log(res);
            res.push(mh.pop());
        }
        return res;
    }

    constructor(nums) {
        nums = Array.isArray(nums) ? nums : [];
        this.nums = nums;
        DEV && log(this.nums);
    }

    buildHeap() {
        this._fullFloat();
        this._sink();
        DEV && log(this.nums);
    }

    isEmpty() {
        return this.nums.length <= 0;
    }

    push(num) {
        this.nums.push(num);
        this._quickFloat();
        this._sink();
    }

    pop() {
        if (this.nums.length === 0) {
            return null;
        }
        if (this.nums.length === 1) {
            return this.nums.shift();
        }
        const res = this.nums[0];
        const length = this.nums.length;
        this.nums[0] = this.nums[length - 1];
        this.nums.pop();
        this._sink();
        return res;
    }

    _fullFloat() {
        let n = this.nums.length;
        let i = n - 1;
        let p = Math.floor((i - 1) / 2);
        while (i > 0) {
            if (this.nums[i] < this.nums[p]) {
                [this.nums[i], this.nums[p]] = [this.nums[p], this.nums[i]];
            }
            i--;
            p = Math.floor((i - 1) / 2);
        }

        DEV && log(this.nums);
    }
    _quickFloat() {
        let n = this.nums.length;
        let i = n - 1;
        let p = Math.floor((i - 1) / 2);
        while (i > 0) {
            if (this.nums[i] < this.nums[p]) {
                [this.nums[i], this.nums[p]] = [this.nums[p], this.nums[i]];
            }
            i = p;
            p = Math.floor((i - 1) / 2);
        }
        DEV && log(this.nums);
    }
    _sink() {
        let i, c1, c2, vi, vc1, vc2, min;
        i = 0;
        c1 = i * 2 + 1;
        c2 = i * 2 + 2;
        vi = this.nums[i];
        vc1 = this.nums[c1];
        vc2 = this.nums[c2];

        DEV && log(this.nums, i, c1, c2, vi, vc1, vc2, min)

        if (vi == null) return;

        while (true) {
            if (vc1 == null && vc2 == null) {
                DEV && log('isReturn1')
                return;
            } else if (vc1 == null) {
                min = Math.min(vi, vc2);
                if (min === vc2) {
                    [this.nums[i], this.nums[c2]] = [this.nums[c2], this.nums[i]];
                    i = c2;
                } else {
                    DEV && log('isReturn2')
                    return;
                }
            } else if (vc2 == null) {
                min = Math.min(vi, vc1);
                if (min === vc1) {
                    [this.nums[i], this.nums[c1]] = [this.nums[c1], this.nums[i]];
                    i = c1;
                } else {
                    DEV && log('isReturn3')
                    return;
                }
            } else {
                min = Math.min(vi, vc1, vc2);
                if (min === vc1) {
                    [this.nums[i], this.nums[c1]] = [this.nums[c1], this.nums[i]];
                    i = c1;
                } else if (min === vc2) {
                    [this.nums[i], this.nums[c2]] = [this.nums[c2], this.nums[i]];
                    i = c2;
                } else {
                    DEV && log('isReturn4')
                    return;
                }
            }

            c1 = i * 2 + 1;
            c2 = i * 2 + 2;
            vc1 = this.nums[c1];
            vc2 = this.nums[c2];
            DEV && log(this.nums, i, c1, c2, vi, vc1, vc2, min)
        }
    }
}


console.log(MinerHeap.sort( [9, 3, 7, 6, 5, 1, 10, 2]));
console.log(MinerHeap.sort( [9]));
console.log(MinerHeap.sort( []));
