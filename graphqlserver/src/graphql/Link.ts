
import { NexusGenObjects } from "../../nexus-typegen";  
import { extendType, nonNull, objectType, stringArg, intArg, arg } from "nexus";  
import { prisma, PrismaClient } from '@prisma/client' 
import { Context } from '../context'

export const Articles = objectType({
    name: "Articles", // <- Name of your type
    definition(t) {
        
        t.nonNull.string("title"); 
        t.nonNull.string("content"); 
        t.nonNull.string("id");
        t.nonNull.string("author");
        t.nonNull.string("previewimage");
        t.nonNull.string("htmlcontent");

       
        
        
        
        
    },
});







export const Comments = objectType({
    name: "Comments", // <- Name of your type
    definition(t) {
        t.nonNull.string("id"); 
        t.nonNull.string("title"); 
        t.nonNull.string("articleid"); 
        
        
        
    },
});





export const LinkQuery = extendType({  // 2
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("articlefeed", {   
            type: "Articles",
            args: {
                  
                skip: intArg(),   
                take: intArg(),
                cursor:stringArg(),   
            },
            resolve(parent, args, context) {   
                if(args?.cursor){
                    return context.prisma.articles.findMany({

                        skip: args?.skip as number | undefined,    // 2
                        take: args?.take as number | undefined,
                        cursor: {   
                            id: args?.cursor as string | undefined,
                          }
                        
                        
                    });

                }
                else{
                    return context.prisma.articles.findMany({

                            // 2
                        take: args?.take as number | undefined,
                        
                        
                        
                    });

                }
                
            },
        });


        
    },
});



export const CommentQuery = extendType({  // 2
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("comment", {   
            type: "Comments",
            args: {
                  
                
                articleidarg:stringArg() , 
            
            },
            resolve(parent, args, context, info) {   

                if(args.articleidarg!=null){
                    return context.prisma.comment.findMany({
                        

                        where: {
                            articleid: args.articleidarg,
                        }

                        
                        
                        
                        
                        
                    });

                }
                else
                {
                    return context.prisma.comment.findMany(
                        
                    )
                }
                    

                }
                
            },
        );


        
    },
});


export const LinkMutation = extendType({  // 1
    type: "Mutation", 
      
    definition(t) {
        t.nonNull.field("post", {  // 2
            type: "Comments",  
            args: {
                  
                title: stringArg(),   
                arrticleid: stringArg(),
                
            },
            
            
            resolve(parent, args, context) {    
                
                
               
                return context.prisma.comment.create({
                    data:{

                        title: args?.title as string ,
                        articleid : args?.arrticleid as string


                    }
                    

                });
            },
        });
    },
});





export const ArticleMutation = extendType({  // 1
    type: "Mutation", 
      
    definition(t) {
        t.nonNull.field("createarticle", {  // 2
            type: "Articles",  
            args: {
                  
                title: stringArg(),   
                content: stringArg(),
                author: stringArg(),
                previewimage: stringArg(),
                htmlcontent: stringArg()
                
                
            },
            
            
            resolve(parent, args, context) {    
                
                
               
                return context.prisma.articles.create({
                    data:{

                        title: args?.title as string ,
                        content : args?.content as string,
                        author: args?.author as string,
                        previewimage: args?.previewimage as string,
                        htmlcontent: args?.htmlcontent as string,



                    }
                    

                });
            },
        });
    },
});





export const ArticleMutationUpdate = extendType({  // 1
    type: "Mutation", 
      
    definition(t) {
        t.nonNull.field("updatearticle", {  // 2
            type: "Articles",  
            args: {
                  
                
                id:stringArg(),
                content :stringArg(),
                title :stringArg(),
                previewimage: stringArg(),
                author: stringArg(),
                htmlcontent: stringArg()
                
            },
            
            
            resolve(parent, args, context) {    
                
                
               
                return context.prisma.articles.update({
                    where: {
                        id: args?.id as string 
                      },
                    data:{

                        title: args?.title as string ,
                        content : args?.content as string,
                        author: args?.author as string,
                        previewimage: args?.previewimage as string,
                        htmlcontent: args?.htmlcontent as string 


                    }
                    

                });
            },
        });
    },
});





export const ArticleMutationDelete = extendType({  // 1
    type: "Mutation", 
      
    definition(t) {
        t.nonNull.field("deletearticle", {  // 2
            type: "Articles",  
            args: {
                  
                
                id:stringArg(),
           
                
            },
            
            
            resolve(parent, args, context) {    
                
                
               
                return context.prisma.articles.delete({
                    where: {
                        id: args?.id as string 
                      }
                    

                });
            },
        });
    },
});