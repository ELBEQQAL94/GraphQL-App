const Post = require('../../models/Post');
const checkAuth        = require('../../Util/check_auth');
const {
    UserInputError,
    AuthenticationError 
} = require('apollo-server');

module.exports = {
    Mutation:{
        async likePost(_, { postId } , context ){

            const { username } = checkAuth(context);

            const post = await Post.findById(postId);

            if(post){
              
                if(post.likes.find(like => like.username === username)){
                    // unlike post
                    post.likes = post.likes.filter(like => like.username !== username);
                } else {
                    // like post
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    });

                }

                await post.save();
                
                return post;
                
            } else throw new UserInputError('Post not found');
        }
    }
}