import { getBlogsAction, getBlogsCountAction } from "@/actions";
import DeleteBlogButton from "@/components/atoms/delete-blog-button";
import CreateBlogForm from "@/components/organisms/blog-forms/create-blog-form";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Button,
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui";
import Link from "next/link";
import { use } from "react";

interface Blog {
    blog_id: number;
    content: string;
    created_at: string;
    title: string;
}

interface HomePageProps {
    searchParams: Promise<{ page?: string }>;
}

const HomePage = ({ searchParams }: HomePageProps) => {
    const params = use(searchParams);
    const currentPage = Number(params.page) || 1;
    const blogsPerPage = 5;

    const userBlogs:
        | {
              success: boolean;
              message: string;
              data?: Blog[];
          }
        | {
              success: boolean;
              data: Blog[];
              message?: undefined;
          } = use(getBlogsAction(currentPage, blogsPerPage));

    const blogCount:
        | {
              success: boolean;
              message: string;
              count?: number;
          }
        | {
              success: boolean;
              count: number;
              message?: undefined;
          } = use(getBlogsCountAction());

    const totalPages = blogCount.success ? Math.ceil((blogCount.count || 0) / blogsPerPage) : 0;
    return (
        <main className="flex items-center flex-col min-h-screen">
            <Card className="w-full max-w-md h-fit p-6">
                <CardHeader>
                    <CardTitle>Create New Blog</CardTitle>
                    <CardDescription>
                        Use the form below to create a new blog post. Your blogs will be listed below the form.
                    </CardDescription>
                </CardHeader>
                <CreateBlogForm />
            </Card>

            <section className="w-full max-w-3xl mt-8">
                <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>
                {!userBlogs.success && <p>No blogs found.</p>}

                {userBlogs.data && userBlogs.data.length > 0 && (
                    <>
                        {userBlogs.data.map((blog) => (
                            <Card key={blog.blog_id} className="mb-4">
                                <CardHeader>
                                    <CardTitle>{blog.title}</CardTitle>
                                    <CardDescription>{new Date(blog.created_at).toLocaleDateString()}</CardDescription>
                                </CardHeader>
                                <CardContent>{blog.content}</CardContent>
                                <CardFooter className="flex flex-col gap-2">
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href={`/home/${blog.blog_id}/edit`}>Edit</Link>
                                    </Button>
                                    <DeleteBlogButton blog_id={blog.blog_id} />
                                </CardFooter>
                            </Card>
                        ))}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href={currentPage > 1 ? `/home?page=${currentPage - 1}` : "#"}
                                                className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                                            />
                                        </PaginationItem>

                                        {/* First page */}
                                        <PaginationItem>
                                            <PaginationLink href="/home?page=1" isActive={currentPage === 1}>
                                                1
                                            </PaginationLink>
                                        </PaginationItem>

                                        {/* Show ellipsis if current page is far from start */}
                                        {currentPage > 3 && (
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )}

                                        {/* Show pages around current page */}
                                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                                            .filter(
                                                (page) =>
                                                    page > 1 && page < totalPages && Math.abs(page - currentPage) <= 1,
                                            )
                                            .map((page) => (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        href={`/home?page=${page}`}
                                                        isActive={currentPage === page}
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}

                                        {/* Show ellipsis if current page is far from end */}
                                        {currentPage < totalPages - 2 && (
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )}

                                        {/* Last page */}
                                        {totalPages > 1 && (
                                            <PaginationItem>
                                                <PaginationLink
                                                    href={`/home?page=${totalPages}`}
                                                    isActive={currentPage === totalPages}
                                                >
                                                    {totalPages}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )}

                                        <PaginationItem>
                                            <PaginationNext
                                                href={currentPage < totalPages ? `/home?page=${currentPage + 1}` : "#"}
                                                className={
                                                    currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
                                                }
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </>
                )}
            </section>
        </main>
    );
};

export default HomePage;
