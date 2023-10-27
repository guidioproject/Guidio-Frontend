import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as styles from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize'

import { useSelector } from "react-redux";

import Loading from "../../ui/Loading";

const MarkdownContent = ({ content }) => {
	const { isLoading } = useSelector(state => state.ui);
	try {
		return (
			<div className="w-full h-full p-4 rounded bg-light-main markdown overflow-auto ">
				{isLoading ? <Loading /> :
					<div>
						<ReactMarkdown remarkPlugins={[[remarkGfm]]} rehypePlugins={[[rehypeRaw, rehypeSanitize]]}
							components={{
								code({ inline, className, children, ...props }) {
									const match = /language-(\w+)/.exec(className || "");
									return !inline && match ? (
										<SyntaxHighlighter
											style={styles.nord}
											language={match[1]}
											PreTag="div"
										>
											{children}
										</SyntaxHighlighter>
									) : (
										<code className={"bg-gray-main rounded p-1 text-light-main"} {...props}>
											{children}
										</code>
									);
								}
							}}
							children={content}
						/>
					</div>
				}
			</div>
		)
	} catch (err) {
		console.log(err);
	}
}
export default MarkdownContent