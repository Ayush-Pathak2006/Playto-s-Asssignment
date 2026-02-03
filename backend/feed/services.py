def build_comment_tree(comments):
    comment_map = {}
    roots = []

    for comment in comments:
        comment.replies_list = []
        comment_map[comment.id] = comment

    for comment in comments:
        if comment.parent_id:
            parent = comment_map.get(comment.parent_id)
            if parent:
                parent.replies_list.append(comment)
        else:
            roots.append(comment)

    return roots
