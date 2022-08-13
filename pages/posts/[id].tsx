import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Date from "../../components/date";
import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData, PostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

type Params = { id: string };
type Props = PostData;

export const getStaticProps: GetStaticProps<Props, Params> = async ({
	params,
}) =>
	params?.id
		? {
				props: await getPostData(params.id),
				revalidate: false,
		  }
		: { notFound: true };

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: getAllPostIds(),
	fallback: false,
});

const Page: NextPage<Props> = ({ contentHtml, date, title }) => (
	<Layout>
		<Head>
			<title>{title}</title>
		</Head>
		<article>
			<h1 className={utilStyles.headingXl}>{title}</h1>
			<div className={utilStyles.lightText}>
				<Date dateString={date} />
			</div>
			<div dangerouslySetInnerHTML={{ __html: contentHtml }} />
		</article>
	</Layout>
);

export default Page;
