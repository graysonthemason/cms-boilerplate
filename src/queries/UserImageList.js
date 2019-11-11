import gql from 'graphql-tag';

export default gql `
query UserImageList($pagination: Pagination, $sort: Sort, $filter: Filter) {
  allUserImages: userImageFeed(pagination: $pagination, sort: $sort, filter: $filter) {
    rows {
			id
		url
    user {id}
		public_id
		}
    count
	}}
	`
