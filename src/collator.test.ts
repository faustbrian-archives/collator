import "jest-extended";

import { Collator } from "../src";

let subject: Collator;

// @ts-ignore
beforeEach(() => (subject = new Collator(0, { numeric: true })));

describe("Collator", () => {
	describe("#isEqual", () => {
		it("should return true", () => {
			expect(subject.isEqual("0.0.0", "0.0.0")).toBeTrue();
			expect(subject.isEqual("1.2.3", "1.2.3")).toBeTrue();

			expect(subject.isEqual("0.0", "0.0")).toBeTrue();
			expect(subject.isEqual("1.2", "1.2")).toBeTrue();

			expect(subject.isEqual("0", "0")).toBeTrue();
			expect(subject.isEqual("1", "1")).toBeTrue();
		});

		it("should return false", () => {
			expect(subject.isEqual("0.0.0", "0.0.1")).toBeFalse();
			expect(subject.isEqual("1.2.3", "1.2.4")).toBeFalse();

			expect(subject.isEqual("0.1", "0.0")).toBeFalse();
			expect(subject.isEqual("1.2", "1.3")).toBeFalse();

			expect(subject.isEqual("0", "1")).toBeFalse();
			expect(subject.isEqual("1", "2")).toBeFalse();
		});
	});

	describe("#isGreaterThan", () => {
		it("should return true", () => {
			expect(subject.isGreaterThan("2.1.0", "1.9.0")).toBeTrue();
			expect(subject.isGreaterThan("1.9.1", "1.9.0")).toBeTrue();
			expect(subject.isGreaterThan("10.0.0", "1.0.0")).toBeTrue();
			expect(subject.isGreaterThan("10.0.0", "8.9.0")).toBeTrue();
			expect(subject.isGreaterThan("1.2.3-next.10", "1.2.3-next.6")).toBeTrue();
			expect(
				subject.isGreaterThan("2.0.0-alpha-10", "2.0.0-alpha-6")
			).toBeTrue();
			expect(subject.isGreaterThan("2.0.0-beta.1", "2.0.0-alpha.8")).toBeTrue();
		});

		it("should return false", () => {
			expect(subject.isGreaterThan("1.9.0", "2.1.0")).toBeFalse();
			expect(subject.isGreaterThan("1.9.0", "1.9.1")).toBeFalse();
			expect(subject.isGreaterThan("1.0.0", "10.0.0")).toBeFalse();
			expect(subject.isGreaterThan("8.9.0", "10.0.0")).toBeFalse();
			expect(
				subject.isGreaterThan("1.2.3-next.6", "1.2.3-next.10")
			).toBeFalse();
			expect(
				subject.isGreaterThan("2.0.0-alpha-6", "2.0.0-alpha-10")
			).toBeFalse();
			expect(
				subject.isGreaterThan("2.0.0-alpha.8", "2.0.0-beta.1")
			).toBeFalse();
		});
	});

	describe("#isGreaterThanOrEqual", () => {
		it("should return true", () => {
			expect(subject.isGreaterThanOrEqual("0.0.0", "0.0.0")).toBeTrue();
			expect(subject.isGreaterThanOrEqual("1.2.3", "1.2.3")).toBeTrue();
			expect(subject.isGreaterThanOrEqual("2.1.0", "1.9.0")).toBeTrue();
			expect(subject.isGreaterThanOrEqual("1.9.1", "1.9.0")).toBeTrue();
			expect(subject.isGreaterThanOrEqual("10.0.0", "1.0.0")).toBeTrue();
			expect(subject.isGreaterThanOrEqual("10.0.0", "8.9.0")).toBeTrue();
			expect(
				subject.isGreaterThanOrEqual("1.2.3-next.10", "1.2.3-next.6")
			).toBeTrue();
			expect(
				subject.isGreaterThanOrEqual("2.0.0-alpha-10", "2.0.0-alpha-6")
			).toBeTrue();
			expect(
				subject.isGreaterThanOrEqual("2.0.0-beta.1", "2.0.0-alpha.8")
			).toBeTrue();
		});

		it("should return false", () => {
			expect(subject.isGreaterThanOrEqual("1.9.0", "2.1.0")).toBeFalse();
			expect(subject.isGreaterThanOrEqual("1.9.0", "1.9.1")).toBeFalse();
			expect(subject.isGreaterThanOrEqual("1.0.0", "10.0.0")).toBeFalse();
			expect(subject.isGreaterThanOrEqual("8.9.0", "10.0.0")).toBeFalse();
			expect(
				subject.isGreaterThanOrEqual("1.2.3-next.6", "1.2.3-next.10")
			).toBeFalse();
			expect(
				subject.isGreaterThanOrEqual("2.0.0-alpha-6", "2.0.0-alpha-10")
			).toBeFalse();
			expect(
				subject.isGreaterThanOrEqual("2.0.0-alpha.8", "2.0.0-beta.1")
			).toBeFalse();
		});
	});

	describe("#isLessThan", () => {
		it("should return true", () => {
			expect(subject.isLessThan("1.9.0", "2.1.0")).toBeTrue();
			expect(subject.isLessThan("1.9.0", "1.9.1")).toBeTrue();
			expect(subject.isLessThan("1.0.0", "10.0.0")).toBeTrue();
			expect(subject.isLessThan("8.9.0", "10.0.0")).toBeTrue();
			expect(subject.isLessThan("1.2.3-next.6", "1.2.3-next.10")).toBeTrue();
			expect(subject.isLessThan("2.0.0-alpha-6", "2.0.0-alpha-10")).toBeTrue();
			expect(subject.isLessThan("2.0.0-alpha.8", "2.0.0-beta.1")).toBeTrue();
		});

		it("should return false", () => {
			expect(subject.isLessThan("2.1.0", "1.9.0")).toBeFalse();
			expect(subject.isLessThan("1.9.1", "1.9.0")).toBeFalse();
			expect(subject.isLessThan("10.0.0", "1.0.0")).toBeFalse();
			expect(subject.isLessThan("10.0.0", "8.9.0")).toBeFalse();
			expect(subject.isLessThan("1.2.3-next.10", "1.2.3-next.6")).toBeFalse();
			expect(subject.isLessThan("2.0.0-alpha-10", "2.0.0-alpha-6")).toBeFalse();
			expect(subject.isLessThan("2.0.0-beta.1", "2.0.0-alpha.8")).toBeFalse();
		});
	});

	describe("#isLessThanOrEqual", () => {
		it("should return true", () => {
			expect(subject.isLessThanOrEqual("0.0.0", "0.0.0")).toBeTrue();
			expect(subject.isLessThanOrEqual("1.2.3", "1.2.3")).toBeTrue();
			expect(subject.isLessThanOrEqual("1.9.0", "2.1.0")).toBeTrue();
			expect(subject.isLessThanOrEqual("1.9.0", "1.9.1")).toBeTrue();
			expect(subject.isLessThanOrEqual("1.0.0", "10.0.0")).toBeTrue();
			expect(subject.isLessThanOrEqual("8.9.0", "10.0.0")).toBeTrue();
			expect(
				subject.isLessThanOrEqual("1.2.3-next.6", "1.2.3-next.10")
			).toBeTrue();
			expect(
				subject.isLessThanOrEqual("2.0.0-alpha-6", "2.0.0-alpha-10")
			).toBeTrue();
			expect(
				subject.isLessThanOrEqual("2.0.0-alpha.8", "2.0.0-beta.1")
			).toBeTrue();
		});

		it("should return false", () => {
			expect(subject.isLessThanOrEqual("2.1.0", "1.9.0")).toBeFalse();
			expect(subject.isLessThanOrEqual("1.9.1", "1.9.0")).toBeFalse();
			expect(subject.isLessThanOrEqual("10.0.0", "1.0.0")).toBeFalse();
			expect(subject.isLessThanOrEqual("10.0.0", "8.9.0")).toBeFalse();
			expect(
				subject.isLessThanOrEqual("1.2.3-next.10", "1.2.3-next.6")
			).toBeFalse();
			expect(
				subject.isLessThanOrEqual("2.0.0-alpha-10", "2.0.0-alpha-6")
			).toBeFalse();
			expect(
				subject.isLessThanOrEqual("2.0.0-beta.1", "2.0.0-alpha.8")
			).toBeFalse();
		});
	});
});
