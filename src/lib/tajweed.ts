interface TajweedMetadata {
	identifier: string;
	type: string;
	description: string;
	default_css_class: string;
	html_color: string;
}

class Tajweed {
	private meta: TajweedMetadata[];

	constructor() {
		this.meta = [];
		this.createMetaData();
	}

	private createMetaData(): void {
		this.meta = [
			{
				identifier: '[h',
				type: 'hamza-wasl',
				description: 'Hamzat ul Wasl',
				default_css_class: 'ham_wasl',
				html_color: '#AAAAAA'
			},
			{
				identifier: '[s',
				type: 'silent',
				description: 'Silent',
				default_css_class: 'slnt',
				html_color: '#AAAAAA'
			},
			{
				identifier: '[l',
				type: 'laam-shamsiyah',
				description: 'Lam Shamsiyyah',
				default_css_class: 'slnt',
				html_color: '#AAAAAA'
			},
			{
				identifier: '[n',
				type: 'madda-normal',
				description: 'Normal Prolongation: 2 Vowels',
				default_css_class: 'madda_normal',
				html_color: '#537FFF'
			},
			{
				identifier: '[p',
				type: 'madda-permissible',
				description: 'Permissible Prolongation: 2, 4, 6 Vowels',
				default_css_class: 'madda_permissible',
				html_color: '#4050FF'
			},
			{
				identifier: '[m',
				type: 'madda-necesssary',
				description: 'Necessary Prolongation: 6 Vowels',
				default_css_class: 'madda_necessary',
				html_color: '#000EBC'
			},
			{
				identifier: '[q',
				type: 'qalaqah',
				description: 'Qalaqah',
				default_css_class: 'qlq',
				html_color: '#DD0008'
			},
			{
				identifier: '[o',
				type: 'madda-obligatory',
				description: 'Obligatory Prolongation: 4-5 Vowels',
				default_css_class: 'madda_pbligatory',
				html_color: '#2144C1'
			},
			{
				identifier: '[c',
				type: 'ikhafa-shafawi',
				description: "Ikhafa' Shafawi - With Meem",
				default_css_class: 'ikhf_shfw',
				html_color: '#D500B7'
			},
			{
				identifier: '[f',
				type: 'ikhafa',
				description: "Ikhafa'",
				default_css_class: 'ikhf',
				html_color: '#9400A8'
			},
			{
				identifier: '[w',
				type: 'idgham-shafawi',
				description: 'Idgham Shafawi - With Meem',
				default_css_class: 'idghm_shfw',
				html_color: '#58B800'
			},
			{
				identifier: '[i',
				type: 'iqlab',
				description: 'Iqlab',
				default_css_class: 'iqlb',
				html_color: '#26BFFD'
			},
			{
				identifier: '[a',
				type: 'idgham-without-ghunnah',
				description: 'Idgham - With Ghunnah',
				default_css_class: 'idgh_ghn',
				html_color: '#169200'
			},
			{
				identifier: '[u',
				type: 'idgham-without-ghunnah',
				description: 'Idgham - Without Ghunnah',
				default_css_class: 'idgh_w_ghn',
				html_color: '#169200'
			},
			{
				identifier: '[d',
				type: 'idgham-mutajanisayn',
				description: 'Idgham - Mutajanisayn',
				default_css_class: 'idgh_mus',
				html_color: '#A1A1A1'
			},
			{
				identifier: '[b',
				type: 'idgham-mutaqaribayn',
				description: 'Idgham - Mutaqaribayn',
				default_css_class: 'idgh_mus',
				html_color: '#A1A1A1'
			},
			{
				identifier: '[g',
				type: 'ghunnah',
				description: 'Ghunnah: 2 Vowels',
				default_css_class: 'ghn',
				html_color: '#FF7E1E'
			}
		];
	}

	/**
	 * Parses tajweed from the GlobalQuran and AlQuran APIs to return markup
	 * @param  text      Verse text
	 * @param  fixWebkit Tries to fix for Chrome and Safari. This is experimental and has known problems.
	 * @return           Parsed text that can be used to display tajweed
	 */
	public parse(text: string, fixWebkit: boolean = false): string {
		if (fixWebkit) {
			return this.webkitFix(this.closeParsing(this.parseTajweed(text)));
		}

		return this.closeParsing(this.parseTajweed(text));
	}

	/**
	 * Parses tajweed identifiers into HTML markup
	 * @param  text Verse text
	 * @return Partially processed text
	 */
	private parseTajweed(text: string): string {
		this.meta.forEach((meta) => {
			const regex = new RegExp(`(\\${meta.identifier})`, 'ig');
			text = text.replace(
				regex,
				`<tajweed class="${meta.default_css_class}" data-type="${meta.type}" data-description="${meta.description}" data-tajweed="`
			);
		});

		return text;
	}

	/**
	 * This method tries to add in a fix for webkit browsers that break with <tags> inside a string.
	 * It does so by using the &zwj; joiner, but that does not always work. It's not smart enough to know,
	 * for instance, when properly connect a meem to a yaa, among other things. Your best bet is to not use
	 * this but use Firefox or the like.
	 * @param  text Parsed tajweed verse with <tajweed> tags
	 * @return Modified text with joiners for webkit browsers
	 */
	private webkitFix(text: string): string {
		// Identify Tajweed tags, if there is not a space before or after, add &zwj;
		// After
		text = text.replace(/<\/tajweed>(\S)/g, '</tajweed>&zwj;$1');
		// Before
		text = text.replace(
			/(\S)<tajweed class="(.*?)" data-type="(.*?)" data-description="(.*?)" data-tajweed="(.*?)">(\S)/g,
			'$1<tajweed class="$2" data-type="$3" data-description="$4" data-tajweed="$5">&zwj;&zwj;$6'
		);

		// Let's remove all joiners where not needed for an Alif and a Waw
		text = text.replace(/ٱ&zwj;/g, 'ٱ');

		return text;
	}

	/**
	 * Completes the parsing by replacing tajweed markers with proper HTML
	 * @param  text Partially processed text
	 * @return Fully processed text with HTML tags
	 */
	private closeParsing(text: string): string {
		const regex1 = new RegExp('(\\[)', 'ig');
		text = text.replace(regex1, '">');
		const regex2 = new RegExp('(\\])', 'ig');
		text = text.replace(regex2, '</tajweed>');

		return text;
	}

	/**
	 * Returns tajweed meta settings
	 * @return The Tajweed metadata array
	 */
	public getMeta(): TajweedMetadata[] {
		return this.meta;
	}
}

class Buck {
	private charsArr: string[];
	private buckArr: string[];
	private transArr: string[];

	constructor() {
		const chars = 'آ ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي';
		const buck = 'A A b t v j H x d * r z s $ S D T Z E g f q k l m n h w y';
		const trans = 'ā ā b t th j h kh d dh r z s sh ṣ ḍ ṭ ẓ ʿ gh f q k l m n h w y';

		this.charsArr = chars.split(' ');
		this.buckArr = buck.split(' ');
		this.transArr = trans.split(' ');

		// MISSING CHARACTERS: أ إ ئ ء ة ؤ
		// Let's add them!
		this.charsArr.push('ى');
		this.buckArr.push('Y');
		this.transArr.push('ā');
		this.charsArr.push('أ');
		this.buckArr.push('>');
		this.transArr.push('');
		this.charsArr.push('إ');
		this.buckArr.push('<');
		this.transArr.push('');
		this.charsArr.push('ئ');
		this.buckArr.push('}');
		this.transArr.push('');
		this.charsArr.push('ء');
		this.buckArr.push('X');
		this.transArr.push("'");
		this.charsArr.push('ؤ');
		this.buckArr.push('&');
		this.transArr.push(' ');

		// Missing characters for harakath
		this.charsArr.push('\u{0652}');
		this.buckArr.push('o');
		this.transArr.push("'");
		this.charsArr.push('\u{064e}');
		this.buckArr.push('a');
		this.transArr.push('a');
		this.charsArr.push('\u{0650}');
		this.buckArr.push('i');
		this.transArr.push('i');
		this.charsArr.push('\u{064f}');
		this.buckArr.push('u');
		this.transArr.push('');
		this.charsArr.push('\u{064b}');
		this.buckArr.push('F');
		this.transArr.push('an');
		this.charsArr.push('\u{064d}');
		this.buckArr.push('K');
		this.transArr.push('in');
		this.charsArr.push('\u{064c}');
		this.buckArr.push('N');
		this.transArr.push('un');
		this.charsArr.push('\u{0626}');
		this.buckArr.push('}');
		this.transArr.push('');
		this.charsArr.push('\u{0640}');
		this.buckArr.push('_');
		this.transArr.push('');
		this.charsArr.push('\u{0651}');
		this.buckArr.push('~');
		this.transArr.push('(double)');
		this.charsArr.push('\u{0653}');
		this.buckArr.push('^');
		this.transArr.push('');
		this.charsArr.push('\u{0654}');
		this.buckArr.push('#');
		this.transArr.push('');
		this.charsArr.push('\u{0671}');
		this.buckArr.push('{');
		this.transArr.push('');
		this.charsArr.push('\u{0670}');
		this.buckArr.push('`');
		this.transArr.push('');
		this.charsArr.push('\u{06e5}');
		this.buckArr.push(',');
		this.transArr.push('');
		this.charsArr.push('\u{06e6}');
		this.buckArr.push('.');
		this.transArr.push('');
		this.charsArr.push('ة');
		this.buckArr.push('p');
		this.transArr.push('t');
		this.charsArr.push('\u{06df}');
		this.buckArr.push('@');
		this.transArr.push('');
		this.charsArr.push('\u{06e2}');
		this.buckArr.push('[');
		this.transArr.push('');
		this.charsArr.push('\u{06ed}');
		this.buckArr.push(']');
		this.transArr.push('');
		this.charsArr.push('\u{0621}');
		this.buckArr.push('"');
		this.transArr.push('');
		this.charsArr.push('\u{06DC}');
		this.buckArr.push(':');
		this.transArr.push('');
		this.charsArr.push('\u{06E0}');
		this.buckArr.push('"');
		this.transArr.push('');
		this.charsArr.push(' ');
		this.buckArr.push(' ');
		this.transArr.push(' ');
		this.charsArr.push(';');
		this.buckArr.push(';');
		this.transArr.push('');
		this.charsArr.push('\n');
		this.buckArr.push('\n');
		this.transArr.push('');
	}

	/**
	 * Converts Buckwalter transliteration to Arabic
	 * @param text Text in Buckwalter transliteration
	 * @return Arabic text
	 */
	public toArabic(text: string): string {
		let arabic: string = '';
		const letters = text.split('');

		letters.forEach((letter) => {
			const buckArrKey = this.buckArr.indexOf(letter);

			if (buckArrKey !== -1) {
				// We've found a match
				arabic += this.charsArr[buckArrKey];
			} else {
				// No match found, append the letter as it is
				if (letter !== undefined) {
					arabic += letter;
				}
			}
		});

		return arabic;
	}
}

export { Tajweed, Buck, type TajweedMetadata };
