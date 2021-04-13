export class Collator {
	readonly #collator: Intl.Collator;

	public constructor(
		locales?: string | string[] | undefined,
		options?: Intl.CollatorOptions | undefined
	) {
		this.#collator = new Intl.Collator(locales, options);
	}

	public compare(value: string, other: string): number {
		return this.#collator.compare(value, other);
	}

	public isEqual(value: string, other: string): boolean {
		return this.comparator(value, other) === 0;
	}

	public isGreaterThan(value: string, other: string): boolean {
		return this.comparator(value, other) === 1;
	}

	public isGreaterThanOrEqual(value: string, other: string): boolean {
		return this.isGreaterThan(value, other) || this.isEqual(value, other);
	}

	public isLessThan(value: string, other: string): boolean {
		return this.comparator(value, other) === -1;
	}

	public isLessThanOrEqual(value: string, other: string): boolean {
		return this.isLessThan(value, other) || this.isEqual(value, other);
	}

	private comparator(value: string, other: string): number {
		const a: string[] = value.split(".");
		const b: string[] = other.split(".");

		const hasSameMajor: number = this.#collator.compare(a[0]!, b[0]!);

		if (hasSameMajor) {
			return hasSameMajor;
		}

		const hasSameMinor: number = this.#collator.compare(a[1]!, b[1]!);

		if (hasSameMinor) {
			return hasSameMinor;
		}

		return this.#collator.compare(a.slice(2).join("."), b.slice(2).join("."));
	}
}
