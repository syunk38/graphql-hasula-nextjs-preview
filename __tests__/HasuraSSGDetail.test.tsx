import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { getPage, initTestHelpers } from 'next-page-tester'
import { handlers } from '../mock/handlers'
import userEvent from '@testing-library/user-event'

initTestHelpers()

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

describe('UserDetail Test Cases', () => {
  it('Should render the user detail pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({
      route: '/users/b6137849-7f1d-c2db-e609-22056fb86db3',
    })
    render(page)
    expect(await screen.findByText('User Detail')).toBeInTheDocument()
    expect(screen.getByText('Test user A')).toBeInTheDocument()
    expect(
      screen.getByText('2021-01-13718:06:46.412969+00:00')
    ).toBeInTheDocument()
    userEvent.click(screen.getByTestId('back-to-main'))
    expect(screen.getByText('SSG+ISR')).toBeInTheDocument()
    userEvent.click(
      screen.getByTestId('link-2607950f-9959-1bc7-834d-5656e4aeaac2')
    )
    expect(await screen.findByText('User Detail')).toBeInTheDocument()
    expect(screen.getByText('Test user B')).toBeInTheDocument()
    expect(
      screen.getByText('2021-02-13718:06:46.412969+00:00')
    ).toBeInTheDocument()
  })
})
