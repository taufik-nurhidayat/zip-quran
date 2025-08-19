import { render, fireEvent } from '@testing-library/svelte';
import Page from '../+page.svelte';

describe('Homepage UI', () => {
  test('renders and filters surah list', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(Page);

    // Initially some surahs should be present (we use fallback data)
    expect(getByText('Surah 1')).toBeInTheDocument();

    const input = getByPlaceholderText('Search by name or number');
    await fireEvent.input(input, { target: { value: 'Surah 3' } });

    expect(getByText('Surah 3')).toBeInTheDocument();
    expect(queryByText('Surah 1')).not.toBeInTheDocument();
  });
});
