import RepoItem, { RepoItemType } from './RepoItem'

type RepoListType = {
    repos: RepoItemType[]
}

const  RepoList =  ({ repos }: RepoListType) =>{
  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
        <h2 className='text-3xl my-4 font-bold card-title'>
          Latest Respositories
        </h2>
        {repos.map((repo: RepoItemType) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  )
}



export default RepoList
